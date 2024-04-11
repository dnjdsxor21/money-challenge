
import os
from supabase import create_client, Client
import pandas as pd 

url: str = os.environ.get("SUPABASEURL")
key: str = os.environ.get("SUPABASEKEY")
supabase: Client = create_client(url, key)
TABLE_NAME = 'moneyChallenge'
ROW1 = "email"
ROW2 = "option"


def insert_table(email:str, option:str):
    data, count = supabase.table(TABLE_NAME).insert({
        ROW1: email, ROW2:option
        }).execute()
    return data

def upsert_table(id:list, email:list, option:list):
    data, count = supabase.table(TABLE_NAME).upsert(
        [ {'id':a, ROW1:b, ROW2:c} for (a,b,c,d) in zip(id, email, option)]
        ).execute()
    return data

if __name__=='__main__':
    pass