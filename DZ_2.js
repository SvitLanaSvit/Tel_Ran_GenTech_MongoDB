 //(1) найти ко-во завершенных транзакций не в евро на сумму более 100
 db.transactions.countDocuments(
     {
         "is_completed" : true,
         "currency": {"$ne": "eur"},
         "amount": {"$gt": 100}
     }
 )

//(2) для всех пользователей не из Китая и не из Испании увеличить баланс на 20%
db.users.updateMany(
    {
        "country": {"$nin": ["China", "Spain"]}
    },
    {
        "$mul": {
            "balance": 1.2
        }
    }
)

//(3) разблокировать пользователей, у которых баланс больше нуля или премиальный статус
db.users.updateMany(
    {
        "$or": {
            "balance": {"$gt": 0},
            "is_premium": true
        }
    },
    {
        "$set": {
            "is_blocked": false
        }
    }
)

//(4) найти пользователей из Китая, которые заблокированы и имеют нулевой баланс
db.users.find(
    {
        "country": "China",
        "is_blocked": true,
        $or: [
            { "balance": { $exists: true } },
            { "balance": 0 }
        ]
    }
)

//(5) пользователям не из Китая и не из США, имеющим баланс более 5000, установить статус премиум
db.users.updateMany(
    {
        "country": {"$nin": ["China", "USA"]},
        "balance": {"$gt": 5000}
    },
    {
        "$set":{
            "is_premium": true
        }
    }
)
