import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layout';
import { dollar } from '../../utils/icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
.stats-con{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    .chart-con{
        grid-column: 1 / 4;
        height: 400px;
        
        
        .amount-con{
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
            margin-top: 2rem;
            max-width: 10%;
            .income, .expense{
                grid-column: span 2;
            }
            .income, .expense, .balance{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                border-radius: 20px;
                padding: 1rem;
                p{
                    font-size: 3.5rem;
                    font-weight: 700;
                }
            }
            .balance{
                grid-column: 2 / 4;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                p{
                    color: var(--color-green);
                    opacity: 0.6;
                    font-size: 4.5rem;
                }
            }
        }
    }

    
    
}
`;

export default Dashboard