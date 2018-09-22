# Before You Go

## Supporting OS

macOS

## DO NOT USE THIS ON MOAC MAINNET, YET

We are not responsible for any consequence, if anyone use it on MOAC mainnet.

# Jump In

## Get The Repo

Take the repo to your local machine.

## Install Dependencies

Please make sure you have all dependencies installed before proceeding:

Open Terminal and get into root dir of the project folder, copy and paste below command and press Enter:

```cli
npm install
```

## Decide What You Want

The process supports forming new micro-chain on:

- local private net

- public net

## Let's Go

### step one

Find "preset_states" folder under project root folder.

### step two

In "preset_states" folder:

If you want everything running on your machine, the process is able to create a local private chain from scratch, create new local scs nodes as required and form a new micro-chain. To do this, please find "local_private" folder.

If you want to play on public net:

Before proceeding, please make sure your vnode is started via below command in Terminal:

For testnet:

```cli
moac --testnet --rpc --rpcaddr 127.0.0.1 --rpcport 20001 --rpcapi "db,eth,net,web3,personal,chain3,admin,mc" --verbosity 4
```

If you do not have existing scs node pool available to you and want to create local scs nodes on your machine to form a new scs node pool, please find "self_built_scs_node_pool" folder.

If you want to use existing scs node pool, please find "public_scs_node_pool" folder.

### step three

In the folder you select, copy and paste "process_state.json" to project root folder. This will replace the original file with the same name under root folder. Don't worry about it.

### step four

Open Terminal and get into root dir of the project folder, copy and paste below command and press Enter:

```cli
node ./src/micro_chain_gen
```

You are all set.

To find log files, please read "Log Files" section below.

## Waiting Time In Process

Some steps in the process might take 5-10 mins to complete. If it takes too long, you might want to stop and restart the process.

# Learn More

## Project Status

The current project status is still alpha and only covers very basic features. Please let us know, if anything does not work as expected.

## Log Files

### moac

This is you the log for vnode.

If you use the moac executible in the project folder:

project_root/\_logs/moac.log

Otherwise, you can find the "\_logs" folder in your moac default datadir.

### scs

This is the default location for a local scs node's log file.

project_root/temp/scs_nodes/any_scs_node_name/bin/logs

### other

This is the default location for mixed output of the process.

project_root/console.log

## Configure State

Configuration is done through process_state.json under root dir.

Advanced user is recommended to figure out what phase/state of the microChain generation one starts out with to properly configure to have the process run successfully. E.g., after insufficient account balance happened, one finished funding enough moac and try to run the process from somewhere in the middle.

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

## Customize File & Folder Settings

Review and set ./config.json.
macOS users only need to look at settings under "mac".

    "moac_executable_to_run": to locate which moac executable to run

        "name": the moac executable's file name
        "dir_path": containing dir's path of the executable

    "scsserver_executable_to_copy": to locate which scsserver executable to be copied into new folder in new scs node creation

        "name": the scsserver executable's file name
        "dir_path": containing dir's path of the executable

    "vnode":

        "genesis_dir_path": containing dir's path of the genesis.json for local private chain creation
        "datadir": input for "--datadir", your vnode's dir path

    "scs_nodes":

        "dir_path": containing dir's path of all on-demand new scs nodes

    "temp_dir_path": where temporary files go

    "console_log_file_path": containing dir's path of the consolidated log file. Log files of moac and scsserver can still be found in their default location respectively.
