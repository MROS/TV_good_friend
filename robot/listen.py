#!/usr/bin/env python3
# coding=UTF-8
import sys
import websocket
from random import random
from time import sleep

channel = int(sys.argv[1])
url = "ws://104.199.156.107/channel/%d" % channel

ws = websocket.create_connection(url)

while 1:
	res = ws.recv()
	print('get: '+res)

ws.close()
