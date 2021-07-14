import json


k = []
count = 0
        
with open('data.json', 'w', newline='') as file:
    with open('data.txt', 'r') as f:
        for line in f.readlines():        
            d = json.loads(line)
            subject_name = d['subjectName']
            
            subject_code = d['subjectCode']
            
            a = '{ ' + '"subjectName"' + ': \"' + subject_name + '\" , ' + '"subjectCode"' + ': \"' + subject_code + '\" }'
            
            count +=1
            #print(count)
            k.append(json.loads(a))
    json.dump(k, file, indent=4)
        

