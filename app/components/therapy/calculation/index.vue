<template>
  <section class="calculation">
    <div class="container">
      <div class="grid">
        <div class="item">
          <h2 class="calculation-title">Расчет цены</h2>
          <div class="calculation-subtitle">Цена зависит от следующих показателей</div>
          <ul class="list">
            <li
              v-for="item in list"
              :key="item.title"
              :class="{ active: selectedItem.title === item.title }"
              @click="handleClick(item)"
            >
              {{ item.title }}
            </li>
          </ul>
          <div class="text-block">
            Следует отметить, что постоянный количественный рост и сфера нашей активности позволяет
            оценить значение новых предложений. И нет сомнений, что действия представителей
            оппозиции представлены в исключительно положительном свете. Задача организации, в
            особенности же социально-экономическое развитие говорит о возможностях первоочередных
            требований. Приятно, граждане, наблюдать, как явные признаки победы институционализации,
            превозмогая сложившуюся непростую экономическую ситуацию, указаны как претенденты на
            роль ключевых факторов. В частности, реализация намеченных плановых заданий прекрасно
            подходит для реализации кластеризации усилий.
          </div>
        </div>

        <div class="image">
          <NuxtImg src="/images/page-therapy/calculation/1.png" alt="calculation" />
        </div>
      </div>

      <div class="hint">
        Являясь всего лишь частью общей картины, сделанные на базе интернет-аналитики выводы лишь
        добавляют фракционных разногласий и разоблачены. Для современного мира граница обучения
        кадров, а также свежий взгляд на привычные вещи — безусловно открывает новые горизонты для
        вывода текущих активов. Банальные, но неопровержимые выводы, а также сторонники
        тоталитаризма в науке указаны как претенденты на роль ключевых факторов. В рамках
        спецификации современных стандартов.
      </div>
    </div>
  </section>
</template>

<script setup>
const list = [
  {
    title: 'Кариес',
  },
  {
    title: 'Пульпит',
  },
  {
    title: 'Периодонтит',
  },
  {
    title: 'Другое',
  },
]

const selectedItem = ref(list[0])

const handleClick = (item) => {
  selectedItem.value = item
}
</script>

<style scoped>
.calculation {
  padding: 100px 0;
  background: #fff;
  max-width: 1700px;
  margin: 0 auto;
}

.calculation-title {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 20px;
}

.calculation-subtitle {
  color: #1e1e1e;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 37.5px */
  margin-bottom: 50px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.list {
  display: flex;
  gap: 30px;
  padding: 10px 0;
  margin-bottom: 40px;
}

.list li {
  color: #878787;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 37.5px */
  transition: color 0.3s ease;
  cursor: pointer;
  user-select: none;
}

.list li.active {
  color: #1e1e1e;
  font-weight: 600;
}

.text-block {
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 22.5px */
  width: 90%;
}

.image {
  border-radius: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image img {
  border-radius: 50px;
  display: block;
  width: 100%;
  object-fit: contain;
  aspect-ratio: 834/479;
}

.hint {
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: 125%; /* 22.5px */
  width: 50%;
  margin-top: 60px;
}
</style>
