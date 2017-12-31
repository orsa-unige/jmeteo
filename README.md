# jmeteo - Meteo station data interface

Managing Vantage Davis Pro II data.
Data are collected using our [https://github.com/orsa-unige/vproweather][forked version of vproweather] allowing to output json-like format to stdout.
These data are stored in a mongo db collection. 

In this test we dumped the collection using

    mongoexport --db test --collection meteo_station --jsonArray --pretty --out real-time-dump.json

which is part of the `mongo-tools` unix package, and we use it as a local file.
