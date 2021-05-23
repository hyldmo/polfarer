#!/bin/bash
yarn firebase functions:config:set --token="$FIREBASE_TOKEN" \
	polfarer.db_host="$db_host" \
	polfarer.db_database="$db_database" \
	polfarer.db_user="$db_user" \
	polfarer.db_password="$db_password"
