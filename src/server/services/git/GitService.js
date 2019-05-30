import fs from "fs"
import rimraf from "rimraf"

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

  doClone(){
    const git = require('simple-git/promise');
    const remote = `https://${this.username}:${this.password}@${this.repo}`;

    git().silent(false)
      .clone(remote, this.wordkDirPath + '/src/')
      .then(() => console.log('finished'))
      .catch((err) => console.error('failed: ', err));
  }

  clone(){
    if (fs.existsSync(this.wordkDirPath + '/src/')) {
      rimraf(this.wordkDirPath + "/src/", () => {
        this.doClone()
      })
    } else {
      this.doClone()
    }


  }

}
