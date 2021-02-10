const core = require('@actions/core');
const github = require('@actions/github');
//const wait = require('./wait');



async function run() {
  try {
    const workflow = core.getInput("workflow");
    const token = core.getInput("token");
    const ref = core.getInput('ref')   || github.context.ref
    // Decode inputs, this MUST be a valid JSON string   
    let inputs = {}
    const inputsJson = core.getInput('inputs')
    if(inputsJson) {
      inputs = JSON.parse(inputsJson)
    }
    console.log('start9ng')
    console.log(inputs)
    const octokit =  github.getOctokit(token)
    const repo = github.context.repo.repo
    const owner =  github.context.repo.owner
    // Call workflow_dispatch API
    const dispatchResp = await octokit.request(`POST /repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`, {
      ref: ref,
      inputs: inputsJson
    })
    core.info(`API response status: ${dispatchResp.status} 🚀`)
    core.setOutput("response", dispatchResp);
  } catch (error) {
    console.log(error)
    core.setFailed(error.message);
  }
}

run();
