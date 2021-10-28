from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

@app.get("/basic", status_code=200)
def basic(request: Request):
    return templates.TemplateResponse("01-basic.html", {"request": request})

@app.get("/example-01", status_code=200)
def example01(request: Request):
    return templates.TemplateResponse("01-example.html", {"request": request})

@app.get("/example-02", status_code=200)
def example02(request: Request):
    return templates.TemplateResponse("02-example.html", {"request": request})

@app.get("/example-03", status_code=200)
def example03(request: Request):
    return templates.TemplateResponse("03-example.html", {"request": request})
