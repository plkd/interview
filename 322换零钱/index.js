/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
//   let memo = {};
//   memo[amount + 1] = -2;
  let memo = new Array(amount+1).fill(-1)
  return helper(coins, amount, memo);
};

function helper(conins, amount, memo) {
  if (amount == 0) return 0;
  if (memo[amount] != -2) return memo[amount];

  let ans = Infinity;
  for (let coin in coins) {
    if (amount - coin < 0) continue;
    let sub = helper(coins, amount - coin, memo);

    if (sub == -1) continue;
    ans = Math.min(ans, sub + 1);
  }

  memo[amount] = ans == Infinity ? -1 : ans;
  return memo[amount];
}
