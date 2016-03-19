#!/usr/bin/env python3
# coding=UTF-8
import sys
import websocket
from random import random
from time import sleep

channel = int(sys.argv[1])

url = "ws://104.199.156.107/channel/%d" % channel

ws = websocket.create_connection(url)

myids = ['AlphaGo', 'BetaMow', 'ILoveKobe', 'MaInJo', 'XieInWen', 'ABian', 'TaiwanNo1', 'HackathonHowOne', 'HackathonHowOne']
msgs = ['台北女孩，19y，可來信私聊><', '安安', '這啥啦=_=', '我到底看惹什麼？', '太神啦！！！', '有人在ㄇ？？', "泥豪o'_'o", "永和小公主，徵求74團o'_'o", '可以不要一直徵友嗎="=贊成請私信', '肥宅粗乃玩', '肥宅粗乃玩', '已私信']

while 1:
	myid = myids[int(random() * len(myids))]
	msg = msgs[int(random() * len(msgs))]
	s = '{"cmd": "comment", "user": %s, "text": %s}' % (myid, msg)
	print('send: '+s)
	ws.send(s)
	t = random()*2 + 1
	sleep(t)

ws.close()
