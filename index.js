 function log(message) {
   document.getElementById("log").innerHTML=message;
    console.log(message);
  }
  function error(message) {
    $('#log').append($('<p>').addClass('dark-red').text(message));
    $('#log').scrollTop($('#log').prop('scrollHeight'));
  }
  function waitForReceipt(hash, cb) {
    web3.eth.getTransactionReceipt(hash, function (err, receipt) {
      if (err) {
        error(err);
      }
      if (receipt !== null) {
        // Transaction went through
        if (cb) {
          cb(receipt);
        }
      } else {
        // Try again in 1 second
        window.setTimeout(function () {
          waitForReceipt(hash, cb);
        }, 1000);
      }
    });
  }
  const address = "0xd31D0483Fce8829b146A68D49C3A77aD2b98c64a";
  const abi = [{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"createAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"fundAmount","type":"uint256"}],"name":"directFundTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"fundAmount","type":"uint256"}],"name":"transferFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"fundAmount","type":"uint256"}],"name":"transferViaUpi","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"amounts","type":"uint256"}],"name":"withdraw","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Deposits","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"withdrawal","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"transferDirectly","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"transferViaUPI","type":"event"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMyAccountAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMyAccountBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMyAccountId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMyAccountName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];
  $(function () {
    var banking;
    $('#getAccountDetails').click(function (e) {
      e.preventDefault();
      banking.getMyAccountName.call(function (err, result) {
        if (err) {
          return error(err);
        } 
        // The return value is a BigNumber object
        $('#getName').text(result.toString());
      });
    });
    $('#getAccountDetails').click(function (e) {
      e.preventDefault();
      banking.getMyAccountAddress.call(function (err, result) {
        if (err) {
          return error(err);
        }
        // The return value is a BigNumber object
        $('#getAddress').text(result.toString());
      });
    });
    $('#getAccountDetails').click(function (e) {
      e.preventDefault();
      banking.getMyAccountId.call(function (err, result) {
        if (err) {
          return error(err);
        }
        // The return value is a BigNumber object
        $('#getId').text(result.toString());
      });
    });
    $('#getAccountDetails').click(function (e) {
      e.preventDefault();
      banking.getMyAccountBalance.call(function (err, result) {
        if (err) {
          return error(err);
        } 
        // The return value is a BigNumber object
        $('#getBalance').text(result/(1000000000000000000)+" "+"ETH".toString());
      });
    });
     $('#createAccount').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      banking.createAccount.sendTransaction( document.getElementById("name").value, function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Transaction succeeded.");
        });
      });
    });
      $('#directTransfer').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      banking.directFundTransfer.sendTransaction(document.getElementById("toAddress").value, document.getElementById("transferAmount").value*1000000000000000000, function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Transaction succeeded.");
        });
      });
    });
       $('#transfer').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      banking.transferFunds.sendTransaction(document.getElementById("toAddress").value, document.getElementById("transferAmount").value*1000000000000000000, function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Transaction succeeded.");
        });
      });
    });
        $('#transferViaUpi').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      banking.transferViaUpi.sendTransaction(document.getElementById("toAddress").value, document.getElementById("transferAmount").value*1000000000000000000,{value: window.web3.toWei(document.getElementById("transferAmount").value,'ether')}, function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Transaction succeeded.");
        });
      });
    });
       $('#transfer').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      banking.transferFunds.sendTransaction(document.getElementById("toAddress").value, document.getElementById("transferAmount").value*1000000000000000000, function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Transaction succeeded.");
        });
      });
    });
    $('#withdraw').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      banking.withdraw.sendTransaction( document.getElementById("withdrawAmount").value*1000000000000000000, function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Transaction succeeded.");
        });
      });
    });
    $('#deposit').click( function (e) {
      e.preventDefault();
       if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On Its Way...");
     
                   
      banking.deposit.sendTransaction(document.getElementById("depositAmount").value*1000000000000000000,{value: window.web3.toWei(document.getElementById("depositAmount").value,'ether')}, function (err, hash) {
        if (err) {
          return error(err);
        }
        log( "Depositing Balance Into Your Account...")
        waitForReceipt(hash, function () {
          log("Transaction succeeded.");
        });
      });
    });
    if (typeof(web3) === "undefined") {
      error("Unable to find web3. " +
            "Please run MetaMask (or something else that injects web3).");
    } else {
      log("Found injected web3.");
      web3 = new Web3(web3.currentProvider);
      ethereum.enable();
      if (web3.version.network != 3) {
        error("Wrong network detected. Please switch to the Ropsten test network.");
      } else {
        log("Connected to the Ropsten test network.");
        banking = web3.eth.contract(abi).at(address);
        $('#getAccountDetails').click();
        }
    }
  });
