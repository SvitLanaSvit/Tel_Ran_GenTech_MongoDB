//(1) Вывести количественное распределение товаров по поставщикам, а также общую сумму поставленных товаров
db.goods.aggregate([
    {
        '$group': {
            '_id': '$supplier_id',
            'total_sum_product': {
                '$sum': '$quantity'
            },
            'total_price_products': {
                '$sum': {
                    '$multiply': ['$quantity', '$price']
                }
            }
        }
    }
])

//(2) Вывести общую и среднюю продолжительность звонков по каждой теме
db.calls.aggregate([
    {
        '$unwind': '$topic'
    },
    {
        '$group': {
            '_id': '$topic',
            'total_duration': {'$sum': '$duration_secs'},
            'avg_duration': {'$avg': '$duration_secs'}
        }
    }
])

//(3) Вывести тему звонков, по которой общались меньше всего
db.calls.aggregate([
    {
        '$unwind': '$topic'
    },
    {
        '$group': {
            '_id': '$topic',
            'total_duration_secs': {'$sum': '$duration_secs'}
        }
    },
    {
        '$sort': {
            'total_duration_secs': 1
        }
    },
    {
        '$limit': 1
    },   
    {
        '$project': {
            'theme_of_call': '$_id',
            '_id': 0,
            'total_duration_secs': 1
        }
    } 
])