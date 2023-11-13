import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import React, { useEffect, useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

import { fDate } from '../utils/formatTime';

// components
import ExamesList from '../components/exames-list';

// sections
import {
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

import {
  getDailyProfitPerPeriod,
  getMonthlyProfitPerPeriod,
  getExaminedPatients,
  getProfitPerExam,
  getTotalProfitForPeriod,
  getWeeklyProfitPerPeriod,
} from '../services/DashboardService';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const [patients, setPatients] = useState(null);
  const [totalProfit, setTotalProfit] = useState(0);
  const [monthlyProfit, setMonthlyProfit] = useState(0);
  const [weeklyProfit, setWeeklyProfit] = useState(0);
  const [dailyProfit, setDailyProfit] = useState(0);
  const [profitPerExam, setProfitPerExam] = useState([]);
  const [examinedPatients, setExaminedPatients] = useState({ labels: [], aggregate: [] });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const now = new Date();
      const firstDayOfTheMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayofTheMonth = Date(now.getFullYear(), now.getMonth() + 1, 0);

      setStartDate(fDate(firstDayOfTheMonth, 'yyyy-MM-dd'));
      setEndDate(fDate(lastDayofTheMonth, 'yyyy-MM-dd'));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (startDate && endDate) {
        setTotalProfit(getTotalProfitForPeriod(startDate, endDate));
        setWeeklyProfit(getWeeklyProfitPerPeriod(startDate, endDate));
        setMonthlyProfit(getMonthlyProfitPerPeriod(startDate, endDate));
        setDailyProfit(getDailyProfitPerPeriod(startDate, endDate));
        setProfitPerExam(getProfitPerExam(startDate, endDate));
        setExaminedPatients(getExaminedPatients(startDate, endDate));
      }

      console.log('startDate or endDate changed:', totalProfit, weeklyProfit, monthlyProfit, dailyProfit);
    };

    fetchData();
  }, [startDate, endDate]);

  return (
    <>
      <Helmet>
        <title> Dashboard | ClinAst </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Bem vindo de volta!
          <input type="date" name="date" id="startDate" value={startDate} onChange={handleStartDateChange} />
          <input type="date" name="date" id="endDate" value={endDate} onChange={handleEndDateChange} />
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Faturamento Total" total={totalProfit} icon={'solar:chat-round-money-bold'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Faturamento Semanal"
              total={weeklyProfit}
              color="info"
              icon={'solar:chat-round-money-bold'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Faturamento Mensal"
              total={monthlyProfit}
              color="warning"
              icon={'solar:chat-round-money-bold'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Faturamento Diario"
              total={dailyProfit}
              color="error"
              icon={'solar:chat-round-money-bold'}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Pacientes atendidos"
              // subheader="(+43%) do que no ano passado"
              chartLabels={examinedPatients.labels}
              chartData={examinedPatients.aggregate}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Principais fontes de receita"
              chartData={profitPerExam}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            sx={{
              minHeight: 450,
            }}
          >
            <AppConversionRates
              title="Principais exames"
              subheader="(+43%) do que o ano passado"
              chartData={[
                { label: 'Radiografia (Raio-X)', value: 400 },
                { label: 'Ultrassonografia', value: 430 },
                { label: 'Tomografia Computadorizada', value: 448 },
                { label: 'Ressonância Magnética', value: 470 },
                { label: 'Hemograma Completo', value: 540 },
                { label: 'Teste de Função Hepática', value: 580 },
                { label: 'Urina Rotina', value: 690 },
                { label: 'Eletrocardiograma ', value: 1100 },
                { label: 'Mamografia', value: 1200 },
                { label: 'Colonoscopia', value: 1380 },
              ]}
              sx={{
                minHeight: 450,
              }}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}

          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            sx={{
              minHeight: 450,
            }}
          >
            <AppNewsUpdate
              title="Atualizaçoes"
              list={[...Array(4)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
              sx={{
                minHeight: 450,
              }}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={4}>
            <ExamesList data={patients} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
