import json
from datetime import datetime, timedelta
import random
import os

#File path for the JSON
file_path = '/Users/L078717/Documents/GitHub/experimental/weave-components/src/Chart/sample_bot_data_10.json'

os.makedirs(os.path.dirname(file_path), exist_ok=True)

# Start date
start_date = datetime.strptime("2020-01-01", "%Y-%m-%d")

#Generate data
data = []
for i in range(10):
    # Increment date by a random number of days
    created_date = start_date + timedelta(days=random.randint(1, 10))
    formatted_date = created_date.strftime("%Y-%m-%d")
    
    data.append({
        "created_date": formatted_date,
        "bot_name": f"Bot_{random.randint(1, 10)}",
        "id": i + 1
    })

with open(file_path, "w") as file:
    json.dump(data, file, indent=4)