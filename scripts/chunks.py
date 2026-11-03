import sys
from PIL import Image
n=sys.argv[1]; h=int(sys.argv[2])
im=Image.open(f'shots/{n}.png'); i=0
for y in range(0,im.height,h):
    im.crop((0,y,im.width,min(y+h,im.height))).save(f'shots/{n}-{i}.png'); i+=1
print(n, im.size, i,'chunks')
