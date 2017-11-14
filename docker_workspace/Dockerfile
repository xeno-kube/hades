FROM alpine
MAINTAINER riderstrider001@gmail.com

# add docker-entrypoint.sh
ADD docker-entrypoint.sh /docker-entrypoint.sh

# add kill script
ADD kill_random_pod /usr/local/bin/kill_random_pod

RUN echo "updating container" \
 && apk -q update \
#
 && echo "installing and updating ca-certificates" \
 && apk -q add ca-certificates \
 && update-ca-certificates \
#
 && echo "installing wget" \
 && apk -q add wget \
#
 && echo "installing kubectl" \
 && mkdir /root/.kube \
 && wget -q -nv -O /stable.txt https://storage.googleapis.com/kubernetes-release/release/stable.txt \
 && latest=$(cat /stable.txt) \
 && wget -q -nv -O /usr/local/bin/kubectl https://storage.googleapis.com/kubernetes-release/release/$latest/bin/linux/amd64/kubectl \
 && rm -f /stable.txt \
 && chmod +x /usr/local/bin/kubectl \
#
  && echo "initialising hades_activity.log" \
  && echo "[$(date)] --- initialising Hades ---" > /hades_activity.log \
#
 && echo "making kill and stress scripts executable" \
 && chmod +x /usr/local/bin/kill_random_pod \
#
 && echo "creating cron job for pod kill" \
 && echo "* * * * * /usr/local/bin/kill_random_pod" > /etc/crontabs/root \
#
 && echo "creating cron job for log truncation" \
 && echo "5 1 * * 0 echo '' > /hades_activity.log" >> /etc/crontabs/root \
#
 && echo "making docker-entrypoint.sh executable" \
 && chmod +x /docker-entrypoint.sh \
#
 && echo "creating ENTRYPOINT as docker-entrypoint.sh"

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["Hades has initialised. Starting Hades..."]
