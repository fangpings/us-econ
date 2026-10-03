"""Independent recomputation of the expanded textbook's teaching examples."""
import unittest


class TextbookExamples(unittest.TestCase):
    def test_housing_total_return(self):
        invested = 300000 + 6000
        proceeds = 309000 * .95 + 14000
        self.assertAlmostEqual(proceeds - invested, 1550)
        self.assertAlmostEqual((proceeds / invested - 1) * 100, .50653595)

    def test_mortgage_by_monthly_recurrence(self):
        rate, principal, n = .06 / 12, 400000, 360
        payment = principal * rate / (1 - (1 + rate) ** -n)
        balance, interest = principal, 0
        for _ in range(12):
            interest += balance * rate
            balance = balance * (1 + rate) - payment
        self.assertAlmostEqual(payment, 2398.20210061)
        self.assertAlmostEqual(balance, 395087.95315089)
        self.assertEqual(round(payment * 12, 2), 28778.43)
        self.assertEqual(round(interest, 2), 23866.38)
        self.assertEqual(round(principal - balance, 2), 4912.05)

    def test_refinance_full_precision(self):
        def pay(rate, months):
            r = rate / 12
            return 300000 * r / (1 - (1 + r) ** -months)
        old, same, extended = pay(.06, 240), pay(.045, 240), pay(.045, 360)
        self.assertEqual(round(old - same, 2), 251.35)
        self.assertEqual(round(old - extended, 2), 629.24)
        self.assertAlmostEqual(6000 / (old - same), 23.87, places=2)
        self.assertGreater(extended * 360 - 300000, old * 240 - 300000)

    def test_default_waterfall(self):
        collateral, residual, deficiency, unsecured = 35, 35, 5, 50
        secured_recovery = collateral + residual * deficiency / (deficiency + unsecured)
        other_recovery = residual * unsecured / (deficiency + unsecured)
        self.assertAlmostEqual(secured_recovery, 38.18181818)
        self.assertAlmostEqual(other_recovery, 31.81818182)
        self.assertEqual(secured_recovery + other_recovery, 70)

    def test_margin_cash_and_asset_sale_differ(self):
        asset, debt, haircut = 190, 180, .15
        cash_required = debt - asset * (1 - haircut)
        self.assertAlmostEqual(cash_required, 18.5)
        sale = cash_required / haircut
        self.assertAlmostEqual(sale, 123.33333333)
        self.assertAlmostEqual(debt - sale, (asset - sale) * (1 - haircut))

    def test_capstone(self):
        self.assertEqual(800 - 20 + 50, 830)
        self.assertAlmostEqual((105 / 80 - 1) * 100, 31.25)
        new_pe = (100 * .99) / (5 * 1.02)
        self.assertAlmostEqual(new_pe, 19.41176471)
        self.assertAlmostEqual((new_pe / 20 - 1) * 100, -2.94117647)

    def test_swap_par_rate(self):
        d1, d2 = 1 / 1.03, 1 / (1.03 * 1.04)
        pv_float = 100 * (.03 * d1 + .04 * d2)
        fixed = pv_float / (100 * (d1 + d2))
        self.assertAlmostEqual(pv_float, 6.64675131)
        self.assertAlmostEqual(fixed * 100, 3.49019608)

    def test_enterprise_financing(self):
        self.assertEqual(60 + 20 + 30 - 10 - 40, 60)
        self.assertAlmostEqual((63.6 / 59.4 - 1) * 100, 7.07070707)
        self.assertAlmostEqual((63.6 / 58.8 - 1) * 100, 8.16326531)
        self.assertAlmostEqual((65.4 / 58.8 - 1) * 100, 11.22448980)

    def test_municipal_cash_and_tax(self):
        self.assertAlmostEqual(80 * 1.01 - .8, 80)
        self.assertEqual((30 - 18) / 8, 1.5)
        self.assertEqual((30 * .8 - 18) / 8, .75)
        self.assertAlmostEqual(.03 / (1 - .3) * 100, 4.28571429)

    def test_mbs_principal_and_income(self):
        interest = 1000000 * (.06 - .005) / 12
        principal = 1000 + 20000
        self.assertAlmostEqual((interest + principal) * .1, 2558.33333333)
        self.assertEqual(1000000 - principal, 979000)
        self.assertAlmostEqual(97900 * 1.02, 99858)
        self.assertEqual(5 + (15 - (92 - 80)), 100 - 92)

    def test_housing_pipeline(self):
        self.assertEqual(10000 + 500 - 900, 9600)
        self.assertEqual(1000 + 900 - 700, 1200)
        self.assertEqual(500000 * .8 - 250000, 150000)

    def test_fund_redemption(self):
        sold = 10 / .95
        remaining = 95 - sold
        self.assertAlmostEqual(remaining, 84.47368421)
        self.assertAlmostEqual(remaining / 85, .99380805)
        self.assertAlmostEqual(72 - 112 * .6, 4.8)

    def test_daily_report(self):
        old, new = 4.25 - 4.2, 4.30 - 4.10
        self.assertAlmostEqual((new - old) * 100, 15)
        self.assertAlmostEqual((4.35 - 4.33) * 100, 2)
        self.assertAlmostEqual((1.02 * .98 - 1) * 100, -.04)


if __name__ == '__main__':
    unittest.main()
