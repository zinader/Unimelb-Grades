import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import unicodedata
import re
import matplotlib.pyplot as plt
import numpy as np
import json



URL = "https://handbook.unimelb.edu.au/search?types%5B%5D=subject&year=2021&subject_level_type%5B%5D=all&study_periods%5B%5D=all&area_of_study%5B%5D=all&org_unit%5B%5D=all&campus_and_attendance_mode%5B%5D=all&page=1&sort=_score%7Cdesc"
z = 1
k = 0

with open('data.json', 'w', newline='') as file:
    
    subjects = []
    
    # To be set 317 (317 pages of subjects in the handbook)
    
    while(z<=317):
        r = requests.get(URL)
        soup = BeautifulSoup(r.content, 'html.parser') 
        z = z + 1
        # Dict to be converted to df
        majors = {}
        links = soup.findAll('div',class_='search-result-item__name')


        for i in links:
            k = k +1
            c = i.text
            subject_name = c[:-9]
            subject_code = c[-9:]
            #print(z)
            a = " { \"subjectName\": \"" + subject_name + "\", \"subjectCode\": \"" + subject_code + "\" }"
            d = json.loads(a)
            subjects.append(d)
            
            #print(subjects)
        print(z)

        URL = "https://handbook.unimelb.edu.au/search?types%5B%5D=subject&year=2021&subject_level_type%5B%5D=all&study_periods%5B%5D=all&area_of_study%5B%5D=all&org_unit%5B%5D=all&campus_and_attendance_mode%5B%5D=all&page=" + str(z) + "&sort=_score%7Cdesc"

    json.dump(subjects, file, indent=4)