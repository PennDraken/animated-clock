from PIL import Image
import os

input_fp = "images/numbers3.png"
target = "images/output"
grid_size = 8 # Pixels
num_width  = 5
num_height = 7
num_shift_x = 5 # How much each number is shifted by
num_shift_y = 6

frames_per_column = [
    12,
    4,
    6,
    6,
    5,
    5,
    4,
    12,
    7,
    7,
    7,
    4
]

#
#  Index 0 of each row will just be named this
row_names = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "3",
    "5",
]

# Index 1-n will be named this + frame number (ie index in row)
transition_names = [
    "0-1_",
    "1-2_",
    "2-3_",
    "3-4_",
    "4-5_",
    "5-6_",
    "6-7_",
    "7-8_",
    "8-9_",
    "9-0_",
    "3-0_",
    "5-0_"
]

os.makedirs(target, exist_ok=True)
image = Image.open(input_fp)

for row, frames in enumerate(frames_per_column):
    y_offset = num_shift_y * row
    x_offset = 0  # Horizontal position in pixels
    for frame in range(frames):
        # Define filename
        if frame == 0:
            filename = f"{row_names[row]}.png"
        else:
            filename = f"{transition_names[row]}{frame}.png"
        
        # Calculate cropping box (left, upper, right, lower)
        left = x_offset * grid_size
        upper = y_offset * grid_size
        right = left + (num_width * grid_size)
        lower = upper + (num_height * grid_size)
        
        # Crop and save
        cropped = image.crop((left, upper, right, lower))
        cropped.save(os.path.join(target, filename))
        
        # Move to the next number in the row
        x_offset += num_shift_x
    
    # Move to the next row


print("Extraction complete! Images saved in", target)
