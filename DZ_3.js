//(1) вывести размеры EURO-транзакций из ЕВРОПЫ в долларах
db.transactions.aggregate([
    {
        '$lookup': {
            'from': 'users',
            'localField': 'sender_id',
            'foreignField': 'id',
            'as': 'sender'
        }
    },
    {
        '$match': {
            'sender.is_europe': true,
            'currency': 'eur'
        }
    },
    {
        '$project': {
            'id': 1, '_id': 0,
            'amount_eur': '$amount', 
            'price_usd': {
                '$multiply': ['$amount', 1.05]
            }
        }
    }
])

//(2) вывести количество USD-транзакций из 'China'
db.transactions.aggregate([
    {
        '$match': {
            'currency': 'usd'
        }
    },
    {
        '$lookup': {
            'from': 'users',
            'localField': 'sender_id',
            'foreignField': 'id',
            'as': 'sender'
        }
    },
    {
        '$match': {
            'sender.country': 'China'
        }
    },
    {
        '$count': 'transaction_count'
    }
])

//(3) вывести три самых больших транзакции в 'usd'
db.transactions.aggregate([
    {
        '$match': {
            'currency': 'usd'
        }
    },
    {
        '$sort': {
            'amount': -1
        }
    },
    {
        '$skip': 0
    },
    {
        '$limit': 3
    } 
])

//(4) вывести всех незаблокированных пользователей, у которых есть завершенные (is_completed) транзакции от 10 usd 
db.users.aggregate([
    // все документы
    {
        '$match': {
            'is_blocked': { '$ne': true }
        }
    },
    {
        '$lookup': {
            'from': 'transactions',
            'localField': 'id',
            'foreignField': 'sender_id',
            'as': 'sender'
        }
    },
    {
        '$lookup': {
            'from': 'transactions',
            'localField': 'id',
            'foreignField': 'recipient_id',
            'as': 'recipient'
        }
    },
    {
        '$match': {
            '$or': [
                {'sender.is_completed': true, 'sender.amount': {'$gte': 10}, 'sender.currency': 'usd'},
                {'recipient.is_completed': true, 'recipient.amount': {'$gte': 10}, 'recipient.currency': 'usd'},
            ]
        }
    }
])

//(5) найти пользователей без транзакций
db.users.aggregate([
    {
        $lookup: {
          from: "transactions",
          localField: "id",
          foreignField: "sender_id",
          as: "sent_transactions"
        }
    },
    {
        $lookup: {
          from: "transactions",
          localField: "id",
          foreignField: "recipient_id",
          as: "received_transactions"
        }
    },
    {
        $match: {
            sent_transactions: { '$size': 0 }, 
            received_transactions: { '$size': 0 }
        }
    },
    {
        '$project': {
            'id': 1,
            '_id': 0
        }
    }
])