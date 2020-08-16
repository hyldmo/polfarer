#!/bin/bash
firebase functions:config:set --token="$FIREBASE_TOKEN" \
	polfarer.pg_host="$pg_host" \
	polfarer.pg_database="$pg_database" \
	polfarer.pg_user="$pg_user" \
	polfarer.pg_password="$pg_password"
