from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, PlainTextResponse
from fastapi.staticfiles import StaticFiles 
from fastapi.templating import Jinja2Templates
from supabase_db import insert_table
import os 
import json 

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/assets", StaticFiles(directory="assets"), name="assets") 


@app.get("/robots.txt", response_class=PlainTextResponse)
def get_robots_txt():
    content = """
    User-agent: *
    Allow: /
    Sitemap: 
    """
    return PlainTextResponse(content=content)

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    base = read_file("base.json")
    index = read_file("index.json")
    return templates.TemplateResponse("index.html", {"request": request, "base":base, "index":index})

@app.get("/challenge/{ch_num}")
async def get_content(request: Request, ch_num:int):
    try:
        base = read_file("base.json")
        index = read_file("index.json")
        data = read_file(f"challenge{ch_num}.json")
        return templates.TemplateResponse("content_ver1.html", {"request": request, "base":base, "index":index, "data":data})
    except:
        raise HTTPException(status_code=404,)

@app.post("/apply")
async def get_content(request: Request, email:str, option:str):
    try:
        insert_table(email=email, option=option)
    except Exception as e:
        print(e)
    return 

def read_file(filename):
    data = None 
    with open(os.path.join("assets/json", filename), 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data


