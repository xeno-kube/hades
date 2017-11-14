#!/bin/sh

echo "[$(date)] $1" >> /hades_activity.log

echo "[$(date)] --- starting Hades ---" >> /hades_activity.log

crond -b

tail -F /hades_activity.log
