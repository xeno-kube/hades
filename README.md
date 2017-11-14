# hades
A docker container for testing resilience in a Kubernetes environment.
Hades is responsible for disposing of running pods within your kubernetes environment.

Version 1.0.0

Currently in development.

## Starting Hades
To start Hades, use a YAML file like the one below to deploy it to your kubernetes cluster.

```
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: hades
  labels:
    app: hades
spec:
  replicas: 1
  template:
    metadata:
      name: hades
      labels:
        app: hades
        name: hades-pod
    spec:
      containers:
      - name: hades
        image: xeno-kube/hades:1.0.0
        ports:
          - containerPort: 8000
```

Hades needs a kubeconfig YAML and relevant authentication files.
This is so that Hades can delete the pods from your cluster.

By default, Hades will kill a random pod every 10 minutes.
