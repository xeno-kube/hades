#!/bin/sh

echo $1 >> /hades_activity.log

echo "--- starting Hades ---" >> /hades_activity.log

node /dashboard/bin/www
