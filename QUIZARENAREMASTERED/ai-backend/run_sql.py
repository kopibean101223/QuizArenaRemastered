
import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()
conn = psycopg2.connect(os.getenv('DIRECT_URL'))
cur = conn.cursor()
with open('../frontend/alter_tables.sql', 'r') as f:
    sql = f.read()
cur.execute(sql)
conn.commit()
print('Success')

