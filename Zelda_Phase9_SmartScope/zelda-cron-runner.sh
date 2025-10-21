#!/bin/bash
# Zelda Healing Cron Runner

cd "$HOME/Desktop/LUCCCA"
node zelda/zelda-master.js --auto-fix
node zelda/zelda-data-vault.js
