<template>
  <section class="doctors">
    <div class="container">
      <h2 class="doctors-title">Наши врачи помогут</h2>
      <div class="grid">
        <div class="img">
          <NuxtImg src="/images/page-about/doctors.png" alt="Doctor" />
        </div>
        <div class="block">
          <div class="items">
            <p class="bold">Установить имплант нового поколения быстро и без боли</p>
            <p>Провести профессиональную чистку и отбеливание зубов</p>
            <p>Вылечить кариес и его осложнения</p>
            <p>Удалить зуб любой сложности</p>
            <p>Исправить прикус и сделать художественную реставрацию</p>
            <p>Исправить прикус и сделать художественную реставрацию винирами</p>
            <p>Восстановить зубы различными ортопедическими конструкциями</p>
          </div>
          <button class="doctors-btn" @click="navigateTo('/offers')">Полный перечень услуг</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.doctors {
  padding: 100px 0;
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
}

.doctors-title {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 40px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.img {
  display: flex;
  align-items: center;
  justify-content: center;
}

.img img {
  width: 100%;
  display: block;
}

.block {
  border-radius: 35px;
  background: #eaf2fc;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.items {
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  gap: 20px;
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 22.5px */
}

.items .bold {
  font-weight: 600;
}

.doctors-btn {
  width: fit-content;
  padding: 18.5px 30px;
  background: #0079ff;
  border-radius: 45px;
  border: none;
  color: #fff;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  transition: background 0.3s;
}

.doctors-btn:hover {
  background: #0056cc;
}

/* Mobile adaptation */
@media (max-width: 768px) {
  .doctors {
    padding: 50px 0;
  }

  .doctors-title {
    font-size: clamp(24px, 7.2vw, 30px);
    margin-bottom: 18px;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .img img {
    border-radius: 20px;
  }

  .block {
    border-radius: 22px;
    padding: 21px;
    gap: 14px;
  }

  .items {
    padding: 0;
    gap: 10px;
    font-size: clamp(12px, 3.6vw, 14px);
    line-height: 1.25;
  }

  .doctors-btn {
    padding: 10px 17px;
    border-radius: 26px;
    font-size: clamp(12px, 3.6vw, 14px);
  }
}
</style>
