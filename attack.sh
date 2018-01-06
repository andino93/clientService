#!/bin/bash

vegeta attack -targets=targets.txt -rate=1000 -duration=60s -output=vegeta-data.txt

cat vegeta-data.txt | vegeta report -reporter=text -output=vegeta-report.txt

cat vegeta-data.txt | vegeta report -reporter=plot -output=vegeta-plot.html
