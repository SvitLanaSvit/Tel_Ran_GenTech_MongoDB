//(1) Вывести ТОП-1 стран по общей сумме пожертвований (страна + общая сумма).
db.donations.aggregate([
    {
        '$lookup': {
            'from': 'users',
            'localField': 'donator_id',
            'foreignField': 'id',
            'as': 'user'
        }
    },
    {
        '$group': {
            '_id': '$user.country',
            'total_sum_donats': {
                '$sum': '$amount'
            }
        }
    },
    {
        '$unwind': '$_id'
    },
    {
        '$sort': {
            'total_sum_donats': -1
        }
    },
    {
        '$limit': 1
    },
    {
        '$project': {
            'total_sum_donats': 1,
            'country': '$_id',
            '_id': 0        
        }
    }
])
//(2) Вывести страны со средней реакцией пользователей (напр., пользователи из США имеют сред.реакцию - 4).
db.reactions.aggregate([
    {
        '$lookup': {
            'from': 'users',
            'localField': 'user_id',
            'foreignField': 'id',
            'as': 'user'
        }
    },
    {
        '$group': {
            '_id': '$user.country',
            'avg_reaction': {
                '$avg': '$value'
            }
        }
    },
    {
        '$unwind': '$_id'
    },
    {
        '$project': {
            'avg_reaction': 1,
            'country': '$_id',
            '_id': 0        
        }
    }
])
//(3) Вывести названия стримов без пожертвований или без реакций.
db.streams.aggregate([
    {
        '$lookup': {
            'from': 'donations',
            'localField': 'id',
            'foreignField': 'stream_id',
            'as': 'donation'
        }
    },
    {
        '$lookup': {
            'from': 'reactions',
            'localField': 'id',
            'foreignField': 'stream_id',
            'as': 'reaction'
        }
    },
    {
        '$match': {
            '$or': [
                {'donation': { '$size': 0 }},
                {'reaction': { '$size': 0 }}
            ]
        }
    },
    {
        '$project': {
            'title': 1,
            '_id': 0
        }
    }
])
//(4) Вывести максимальный размер пожертвования для каждого стримера.
db.donations.aggregate([
    {
        '$group': {
            '_id': '$stream_id',
            'max_donatation': {
                '$max': '$amount'
            }
        }
    },
    {
        '$lookup': {
            'from': 'streams',
            'localField': '_id',
            'foreignField': 'id',
            'as': 'stream'
        }
    },
    {
        '$unwind': '$stream'
    },
    {
        '$project': {
            
            '_id': 1,
            'max_donatation': 1,
            'title': '$stream.title'
        }
    }
])
//(5) Вывести ТОП-3 пожертвований из Германии (имя донатора и размер пожертвования).
db.donations.aggregate([
    {
        '$lookup': {
            'from': 'users',
            'localField': 'donator_id',
            'foreignField': 'id',
            'as': 'donator'
        }
    },
    {
        '$unwind': '$donator'
    },
    {
        '$match': {
            'donator.country': 'Germany'
        }
    },
    {
        '$group':{
            '_id': '$donator_id',
            'total_donations': {
                '$sum': '$amount'
            },
            'donator_fullname': {'$first': '$donator.fullname'}
        }
    },
    {
        '$sort': {
            'total_donations': -1
        }
    },
    {
        '$limit': 3
    }
])
