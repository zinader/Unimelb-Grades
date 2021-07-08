import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import unicodedata
import re
import matplotlib.pyplot as plt
import numpy as np
import json


all_subjects = []
all_json_objects = []

with open("subjects.txt", "r") as file:
    for line in file:
        result = re.findall('>.*?<', line)
        all_subjects.append(result[0][1:])
        

with open("data.json", "w") as outfile:
    
    for i in all_subjects:
        subject_code = re.findall('.*?/', i)[0][:-1]
        #print(subject_code)
        subject_semester = re.findall('/.*? ', i)[0][:-1].split('/')[-1]
        #print(subject_semester)
        subject_name = re.findall('-.*?<', i)[0][2:-1]
        #print(subject_name)
        
        if(subject_semester=="SM1" or )
        
        a = " { \"subjectName\": \"" + subject_name + "\", \"subjectCode\": \"" + subject_code + "\",\"semester\": \"" + subject_semester + "\" }"
        d = json.loads(a)
        all_json_objects.append(d)
  

    json.dump(all_json_objects, outfile, indent=4)