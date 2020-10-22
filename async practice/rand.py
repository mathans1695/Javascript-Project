import random as rand;

bits = {}
	
for x in range(26000, 36100, 100):
	bits[x] = 0

for x in range(0, 100000):
	bits[rand.randrange(26000, 36100, 100)] += 1	

for key in bits:
	print(bits[key]/100000 * 100)