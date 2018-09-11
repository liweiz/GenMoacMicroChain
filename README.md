# Before You Go

## Supporting OS

macOS

## Configure

Configuration is done through process_state.json under root dir.

User is recommended to figure out what phase/state of the microChain generation one starts out with to properly configure to have the process run successfully. E.g., after insufficient account balance happened, one finished funding enough moac and try to run the process from somewhere in the middle.

The current project status is still alpha and only covers very basic features. Please let us know, if anything does not work as expected.

## DO NOT USE THIS ON MOAC MAINNET, YET

We are not responsible for any consequence, if anyone use it on MOAC mainnet.

# Quick Start

### STEP 1. Get The Repo

Take the repo to your local machine.

### STEP 2. Install Dependencies

Please make sure you have all dependencies installed before proceeding:

Under root dir of the project folder:

```cli
npm install
```

### STEP 3. Set State:

Review and set ./process_state.json.
File details can be found in Configuration section below.

#### existing vnode on testnet

- "private_n_local_run" set to false

- "chain_id" set to 101

- set "start_vnode_via_process" & "ignore_sync" according to your need

- get and set "addr" for deployed contracts or new ones will be deployed in the process

#### new local private chain

- "private_n_local_run" set to true

- "start_vnode_via_process" set to true

- pick and set chain id in "chain_id" of ./process_state.json and "chainId" of ./genesis.json. They have to be same.

### STEP 4. Start Process From CLI

Open your CLI tool and go to root dir of the project folder

```cli
node ./src/micro_chain_gen
```

User can also run above cmd after modifying the process_state.json file to reflect the current state of process:

- when there is any interruption in the process and user manually sets process state meets requirements to proceed again

- when some resources for the process are available piror to the start of the process such as known scsids

## Log Files

### moac

project_root/\_logs/moac.log

### scs

project_root/temp/scs_nodes/any_scs_node_name/bin/logs

### other

project_root/console.log

## Configuration

### Chain

#### "private_n_local_run"

    flag indicating if everything is local and run on local private network created on demand. Make sure "chainId" in ./genesis.json is the same as "chain_id" in ./process_state.json and not 101, which is for testnet.

#### "auto_state_save"

    true when user want to automatically save updated process_state to process_state.json during the process run.
    It can be helpful for you to restart from some interruption and spend less to finish the process.
    We recommend user to always review the state file and output of the last process session to have it work as expected.

#### "chain_id"

    when "private_n_local_run" set as true, this has to be the same as the chain id set in the genesis file located by "mac.genesis_dir_path"

#### "gas_price_gsha"

    lower and upper bounds of the gas price range

#### "gas"

    "lv" contains three preset levels of gas amount; "usage" contains the level of gas amount used for a specific purpose. E.g., "contract_deployment" is set to use "max" in "lv".

### Vnode

#### "start_vnode_via_process"

    if true, will try to start the vnode at ./temp/vnodes/vnode_0 with RPC settings in "rpc"

#### "name"

    datadir name for locally created vnode. For existing vnode, only how to connect to its live RPC is needed.

#### "min_disposable_balance_in_moac"

    base amount requirement as buffer for the sending address so that there will still be some amout to use if the process estimated cost is exceeded.

#### "log_verbosity"

    set verbosity of moac

#### "service_endpoint"

    used to generate userconfig.json for new scs node

#### "ignore_sync"

    if true, on-testnet vnode does not sync with chain before proceeding to the process

#### "rpc"

    settings for vnode's RPC

### SCS node

#### "scsids"

    list of known scsids

#### "min_disposable_balance_in_moac"

    base amount requirement as buffer for any scsid so that there will still be some amout to use if the process estimated cost is exceeded.

#### "beneficiary"

    address used for all on-demandly created scs nodes as beneficiary in userconfig.json. Empty string indicates using selected sending address.

### Account

#### "default_password"

    universal password to use for all account creation in the process

### VnodeProtocolBase

#### "name"

    first param for contract constructor

#### "min_bond"

    second param for contract constructor, unit: moac

#### "addr"

    non-empty addr indicating no need to deploy new one, otherwise, deploy new one

### SubChainProtocolBase

#### "name"

    first param for contract constructor

#### "min_bond"

    second param for contract constructor, unit: moac

#### "protocol_type"

    third param for contract constructor

#### "addr"

    non-empty addr indicating no need to deploy new one, otherwise, deploy new one

#### "successful_func_call"

    all func call state on this contract

#### "register"

    an array contains each register call's finish status

### SubChainBase

#### "min_num_nodes"

    thrid param for contract constructor

#### "max_num_nodes"

    fourth param for contract constructor

#### "thousandth"

    fifth param for contract constructor

#### "flush_round"

    sixth param for contract constructor

#### "addr"

    non-empty addr indicating no need to deploy new one, otherwise, deploy new one

#### "min_op_balance_in_moac"

    min balance for the contract to be able to operate

#### "min_registration_fee_in_moac"

    min deposit requirement for a scsid to register to the micro-chain

#### "successful_func_call"

    all func call state on this contract

#### "addFund"

    true, if addFund call successful

#### "registerOpen"

    true, if registerOpen call successful

#### "registerClose"

    true, if registerClose call successful

# Notes

## sync waiting time

It might take up to 20+ mins to start to sync. If it takes too long, you might want to stop and restart the process.
