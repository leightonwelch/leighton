# Goal is to have an interactive web page with three elements.
# The first is a select box with the column names of the dataframe in data
# i.e. col-A, col-B
# The second is a select box with all the row values for the selected column 
# multiplied by 2...i.e. if you select Col-A, then 1*2 = 2, 3*2 = 6
# The third is a go button, which when clicked, will call a python function
# that will take the value you submitted in drop box 2, perform some function
# on it using python (x2 again for example) and return it on the page using AJAX
# THANKS!!!!!

from flask import Flask, url_for, render_template
app = Flask(__name__)

#import pandas as pd, numpy as np

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tableData')
def tableData():
    # return pd.DataFrame(np.random.randn(10, 2),columns=['Col-A', 'Col-B']).to_json()
    
    # the reason for this structure is that this is how pandas dataframes are converted 
    # to json, where every row value has an index (r1,r2) and a value (1,3) for a given
    # column (Col-A). 
    return {'col-A':{'r1':1,'r2':3}, 'col-B':{'r1':2, 'r2':4}}

if __name__ == '__main__':
    app.debug = True
    app.run()

