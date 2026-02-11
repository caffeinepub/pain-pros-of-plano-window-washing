# Custom Domain Deployment Guide

This guide explains how to deploy your Pane Pros of Plano application to a custom domain on the Internet Computer.

## Overview

Your application is deployed as a canister on the Internet Computer. By default, it's accessible via the IC's standard URL format (`https://<canister-id>.ic0.app` or `https://<canister-id>.icp0.io`). You can map your own custom domain to this canister for a professional, branded URL.

## Prerequisites

1. A registered domain name (e.g., `paneprosplano.com`)
2. Your deployed backend canister ID
3. Your deployed frontend canister ID (asset canister)
4. Access to your domain's DNS settings

## Step 1: Deploy Your Canisters

First, ensure your application is deployed to the Internet Computer:

