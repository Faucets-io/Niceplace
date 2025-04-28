#!/bin/bash

# Define colors for terminal output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "Starting repository cloning process..."

# Repository URL
REPO_URL="https://github.com/Faucets-io/Niceplace.git"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Error: Git is not installed. Please install Git to proceed.${NC}"
    exit 1
fi

# Clone the repository
echo -e "${YELLOW}Cloning repository from: ${REPO_URL}${NC}"
if git clone "$REPO_URL"; then
    echo -e "${GREEN}Repository successfully cloned!${NC}"
    
    # Change directory to the cloned repo
    cd Niceplace || { echo -e "${RED}Failed to enter repository directory.${NC}"; exit 1; }
    
    # Get repository information
    echo -e "\n${YELLOW}Repository information:${NC}"
    echo -e "${YELLOW}Branches:${NC}"
    git branch -a
    
    echo -e "\n${YELLOW}Latest commits:${NC}"
    git log --oneline -n 5
    
    echo -e "\n${YELLOW}Repository structure:${NC}"
    ls -la
    
    echo -e "\n${GREEN}Repository cloned successfully and ready for use!${NC}"
    echo -e "You can now navigate to the repository with: ${YELLOW}cd Niceplace${NC}"
else
    echo -e "${RED}Failed to clone the repository. Please check the URL and your internet connection.${NC}"
    exit 1
fi
