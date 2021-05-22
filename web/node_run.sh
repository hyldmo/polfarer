#!/bin/bash
node --unhandled-rejections=strict --loader ts-node/esm ./scripts/$1
