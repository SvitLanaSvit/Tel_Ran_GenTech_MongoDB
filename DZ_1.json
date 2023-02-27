db.users.insertMany(
    [{
        'id': 'u001',
        'fullname': 'Svit Lana',
        'created_at': new Date(),
        'country': 'Germany'
    },
    {
        'id': 'u002',
        'fullname': 'Dan Dan',
        'created_at': new Date(),
        'country': 'Germany'
    },
    {
        'id': 'u003',
        'fullname': 'Viktor Wolf',
        'created_at': new Date(),
        'country': 'USA'
    },
    {
        'id': 'u004',
        'fullname': 'Vin Brick',
        'created_at': new Date(),
        'country': 'USA'
    }  ]   
);

db.accounts.insertMany(
    [{
        'id': 'a001',
        'balance': 15000,
        'currency': 'usd',
        'user_id': 'u001',
        'datetime': {
            'created_at': new Date()
        }
    },
    {
        'id': 'a002',
        'balance': 10000,
        'currency': 'usd',
        'user_id': 'u002',
        'datetime': {
            'created_at': new Date()
        }
    },
    {
        'id': 'a003',
        'balance': 8000,
        'currency': 'evro',
        'user_id': 'u002',
        'datetime': {
            'created_at': new Date()
        }
    },
    {
        'id': 'a004',
        'balance': 5000,
        'currency': 'evro',
        'user_id': 'u003',
        'datetime': {
            'created_at': new Date()
        }
    },
    {
        'id': 'a005',
        'balance': 6000,
        'currency': 'usd',
        'user_id': 'u004',
        'datetime': {
            'created_at': new Date()
        }
    },
    {
        'id': 'a006',
        'balance': 5000,
        'currency': 'evro',
        'user_id': 'u004',
        'datetime': {
            'created_at': new Date()
        }
    }
    ]
);

db.transfer_transactions.insertMany(
    [{
      'transfer_id': 'tt001',
      'sender_id': 'u002',
      'receiver_id': 'u004',
      'currency': 'usd',
      'amount': 200.00,
      'created_at': new Date()
    },
    {
      'transfer_id': 'tt002',
      'sender_id': 'u001',
      'receiver_id': 'u003',
      'currency': 'usd',
      'amount': 50.00,
      'created_at': new Date()
    },
    {
      'transfer_id': 'tt003',
      'sender_id': 'u004',
      'receiver_id': 'u001',
      'currency': 'usd',
      'amount': 35.00,
      'created_at': new Date()
    },
    {
      'transfer_id': 'tt004',
      'sender_id': 'u004',
      'receiver_id': 'u002',
      'currency': 'evro',
      'amount': 80.00,
      'created_at': new Date()
    }
    ]
);

db.login_attempts.insertMany(
    [{
      'attempt_id': 'la001',
      'customer_id': 'u001',
      'login_attempt_time': new Date(),
      'login_status': 'success'
    },
    {
      'attempt_id': 'la002',
      'customer_id': 'u002',
      'login_attempt_time': new Date(),
      'login_status': 'success'
    },
    {
      'attempt_id': 'la003',
      'customer_id': 'u003',
      'login_attempt_time': new Date(),
      'login_status': 'success'
    },
    {
      'attempt_id': 'la004',
      'customer_id': 'u004',
      'login_attempt_time': new Date(),
      'login_status': 'success'
    },
    {
      'attempt_id': 'la005',
      'customer_id': 'u003',
      'login_attempt_time': new Date(),
      'login_status': 'success'
    },
    {
      'attempt_id': 'la006',
      'customer_id': 'u001',
      'login_attempt_time': new Date(),
      'login_status': 'success'
    }
    ]
);