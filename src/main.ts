import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const token = core.getInput('token', {required: true})
    const pullNumber = parseInt(core.getInput('pull_number', {required: true}))
    const result = await github.getOctokit(token, {}).rest.pulls.get({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: pullNumber
    })
    core.setOutput('pull_request', result.data)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
