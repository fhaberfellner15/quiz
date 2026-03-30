<script setup lang="ts">
import { useQuizStore, CAREER_INFO } from '../stores/quizStore'
import { storeToRefs } from 'pinia'

const store = useQuizStore()
const {
  questionMax,
  questionCount,
  phase,
  currentQuestion,
  selectedAnswerIndex,
  progress,
  topResults,
} = storeToRefs(store)

const MEDALS = ['🥇', '🥈']
</script>

<template>
  <div class="card shadow" style="width: 580px; max-width: 95vw; border: none;">

    <!-- Header: dark navy, white title -->
    <div class="card-header py-3 text-white border-0" style="background-color: #1a3a5c;">
      <h5 class="fw-bold mb-0">Berufsquiz</h5>
    </div>

    <!-- Quiz Phase -->
    <template v-if="phase === 'quiz' && currentQuestion">
      <div class="card-body bg-light px-4 py-4">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <span class="text-secondary small fw-semibold">Frage {{ questionCount + 1 }} / {{ questionMax }}</span>
        </div>
        <div class="progress mb-4" style="height: 5px;">
          <div
            class="progress-bar"
            role="progressbar"
            :style="{ width: progress + '%', backgroundColor: '#1a3a5c' }"
          ></div>
        </div>

        <p class="fw-semibold mb-3">{{ currentQuestion.text }}</p>

        <div class="list-group answers-list mb-4">
          <button
            v-for="(answer, i) in currentQuestion.answers"
            :key="i"
            type="button"
            class="list-group-item list-group-item-action py-3"
            :class="selectedAnswerIndex === i ? 'active' : 'bg-white'"
            :style="selectedAnswerIndex === i ? 'background-color: #1a3a5c !important; border-color: #1a3a5c;' : ''"
            @click="store.selectAnswer(i)"
          >
            {{ answer.text }}
          </button>
        </div>
      </div>

      <div class="card-footer bg-white border-top d-flex justify-content-between align-items-center px-4 py-3">
        <span class="text-muted small">Wähle die Antwort, die am besten zu dir passt</span>
        <button
          type="button"
          class="btn btn-sm text-white"
          style="background-color: #1a3a5c;"
          :disabled="selectedAnswerIndex === null"
          @click="store.confirmAnswer"
        >
          Weiter &rarr;
        </button>
      </div>
    </template>

    <!-- Result Phase -->
    <template v-else-if="phase === 'result'">
      <div class="card-body bg-light px-4 py-4">
        <div class="d-flex align-items-center mb-1">
          <span class="badge bg-success">Abgeschlossen</span>
        </div>
        <div class="progress mb-4" style="height: 5px;">
          <div class="progress-bar" role="progressbar" style="width: 100%; background-color: #1a3a5c;"></div>
        </div>

        <p class="text-muted small text-center mb-3">Deine besten Übereinstimmungen</p>

        <div class="list-group mb-3">
          <div
            v-for="(item, index) in topResults"
            :key="item.career"
            class="list-group-item bg-white py-3"
            :class="index === 0 ? 'border-start border-4 border-warning' : ''"
          >
            <div class="d-flex align-items-center gap-3">
              <span style="font-size: 1.4rem; min-width: 2rem; text-align: center;">
                {{ MEDALS[index] }}
              </span>
              <span style="font-size: 1.3rem;">{{ CAREER_INFO[item.career].emoji }}</span>
              <div class="flex-grow-1">
                <div class="fw-semibold small">{{ CAREER_INFO[item.career].label }}</div>
                <div class="text-muted" style="font-size: 0.78rem;">{{ CAREER_INFO[item.career].description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer bg-white border-top d-flex justify-content-end px-4 py-3">
        <button type="button" class="btn btn-sm btn-outline-secondary" @click="store.restart">
          Nochmal versuchen
        </button>
      </div>
    </template>

  </div>
</template>

<style scoped>
.answers-list {
  display: grid;
  grid-auto-rows: 1fr;
}

.answers-list .list-group-item {
  display: flex;
  align-items: center;
}
</style>
