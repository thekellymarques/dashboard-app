import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box } from '@mui/material';
// components

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

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | ClinAst </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Bem vindo de volta!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Faturamento diário" total={714000} icon={'solar:health-bold'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Faturamento semanal" total={1352831} color="info" icon={'solar:health-bold'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Faturamento mensal" total={1723315} color="warning" icon={'solar:health-bold'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Faturamento anual" total={234} color="error" icon={'solar:health-bold'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Pacientes atendidos"
              // subheader="(+43%) do que no ano passado"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: '2021',
                  type: 'line',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: '2022',
                  type: 'line',
                  fill: 'solid',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: '2023',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Principais fontes de receita"
              chartData={[
                { label: 'Ultrassonografia', value: 4344 },
                { label: 'Eletrocardiograma', value: 5435 },
                { label: 'Mamografia', value: 1443 },
                { label: 'Radiografia', value: 4443 },
              ]}
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
        </Grid>
      </Container>
    </>
  );
}
