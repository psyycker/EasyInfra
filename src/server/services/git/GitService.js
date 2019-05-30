import fs from "fs"
import rimraf from "rimraf"
import Git from "nodegit"

export default class GitService {

  constructor(workDirPath){
    this.wordkDirPath = workDirPath
    this.client = require("simple-git")(workDirPath)

  }

  setUsername(username){
    this.username = username;
  }

  setPassword(password){
    this.password = password;
  }

  setRepo(repo) {
    this.repo = repo.replace("https://", "").replace("http://", "");
  }

  doClone(branchName){
    const git = require('simple-git/promise');
    const remote = `https://${this.username}:${this.password}@${this.repo}`;
    Git.Clone(remote, this.wordkDirPath + "/src/", {checkoutBranch: branchName}).then(function(repository) {
    });

  }

  clone(branchName="master"){
    if (fs.existsSync(this.wordkDirPath + '/src/')) {
      rimraf(this.wordkDirPath + "/src/", () => {
        this.doClone(branchName)
      })
    } else {
      this.doClone(branchName)
    }


  }

}
