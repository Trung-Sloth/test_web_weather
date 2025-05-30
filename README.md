## Setup Project
1. git clone https://github.com/dam1412/dam.git](https://github.com/dam1412/test_web_weather.git
2. cd weather_project
3. pip install pipenv --user
4. If warning missing path (eg: get warning c:\users\asus\appdata\roaming\python\python311\scripts) 
-> windows search for "Edit the system environment variables" -> "Environment Variables" -> Double click to "Path" 
-> choose New -> paste the warning path -> press OK until all windows closed
5. pipenv install
## Development
1. pipenv run weather_server
3. Ctrl + Click the server's link (eg: https://2870.3.1.2:6782/)
## Add new package
1. pipenv install <package-name> 
