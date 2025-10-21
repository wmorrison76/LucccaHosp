#!/bin/bash
cd "$(dirname "$0")"
chmod +x scripts/dev-all.sh
exec ./scripts/dev-all.sh
