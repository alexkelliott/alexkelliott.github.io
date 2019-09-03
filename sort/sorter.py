# Sorting algorithims and pygame practice
import pygame
import random
pygame.init()

DATA_LENGTH = 250

screen_height = 500
screen_width = 500
main_surface = pygame.display.set_mode((screen_width, screen_height))
clock = pygame.time.Clock()

array = [] #data on the screen
height_list = [] #list containing every height value in order
for i in range(DATA_LENGTH):
    height_list.append(i+1)
while len(height_list) != 0:
    d = height_list[random.randrange(0,len(height_list))]
    array.append(d)
    height_list.remove(d)

def compare(current):
    a = array[current]
    b = array[current+1]
    if a > b: # Left > Right
        #switch blocks
        array[current] = b
        array[current+1] = a

def loop():
    current_comp = 0 #int of the left box being compared
    cycles = 0 #the amount of full loops it has made to the data set
    while True:
        event = pygame.event.poll()
        if event.type == pygame.QUIT:
            break

        #background
        main_surface .fill((0, 0, 0))

        #draw the array
        white = (255, 255, 255)
        red = (255, 0, 0)
        for i in range(len(array)):
            rec = (i*(screen_width/len(array)), (screen_height-array[i]), (screen_width/len(array)), array[i]) 
            if i == current_comp or i == current_comp+1:
                main_surface.fill(red, rec)
            else:
                main_surface.fill(white, rec)

        #make comparison
        compare(current_comp)
        
        #clock.tick(1000)
        current_comp += 1
        if current_comp > len(array)-cycles-2:
            current_comp = 0
            cycles += 1
        if cycles == DATA_LENGTH:
            print("Done!")
        #render all new objects
        pygame.display.flip()
    pygame.quit()
loop()
        
