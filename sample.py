from flask import Flask, url_for, render_template
app = Flask(__name__)

import pandas as pd, numpy as np

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tableData')
def tableData():
    return pd.DataFrame(np.random.randn(10, 2),columns=['Col-A', 'Col-B']).to_json()
    #return '{"data": "table data here"}'

if __name__ == '__main__':
    app.debug = True
    app.run()

