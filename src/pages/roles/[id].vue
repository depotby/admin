<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import { useModal, ModalName } from '@/composables/use-modal.ts';
import { useRole } from '@/composables/use-role.ts';
import UiText from '@/components/ui/text.vue';
import UiButton from '@/components/ui/button.vue';
import UiIcon from '@/components/ui/icon.vue';
import type { ExtendedListRole } from '@/types/models/role.ts';
import type { AbilityName } from '@/types/models/ability.ts';

const route = useRoute();
const api = useApi();
const { open } = useModal();

const loading = ref(false);
const role = ref<ExtendedListRole>();
const opened_groups = ref<Set<string>>(new Set());

const { abilitiesGroups } = useRole(role);
const roleId = computed(() => route.params.id as string);

const loadRole = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.roles.one(roleId.value);
    role.value = data;
  } catch {}
  loading.value = false;
};

const openDeleteModal = () => {
  if (!role.value) return;

  open(ModalName.DELETE_ROLE, { role: role.value });
};

const switchAbility = async (ability: AbilityName) => {
  if (loading.value || !role.value) return;

  loading.value = true;
  try {
    const { data } = await api.roles.switch_ability(role.value.id, ability);
    role.value = data;
  } catch {}
  loading.value = false;
};

const switchGroup = (group: string) => {
  if (opened_groups.value.has(group)) {
    opened_groups.value.delete(group);
  } else {
    opened_groups.value.add(group);
  }
};

loadRole();

useHead(() => ({
  title: role.value?.name,
}));
</script>

<template>
  <div :class="$style['page-roles-id']">
    <div :class="$style['page-roles-id__header']">
      <UiText variant="h3">
        {{ role?.name }}
      </UiText>

      <UiButton
        :disabled="loading"
        color="color-red"
        variant="outlined"
        size="medium-compact"
        @click="openDeleteModal"
      >
        <UiIcon name="delete-rounded" color="color-inherit" />
      </UiButton>
    </div>

    <div :class="$style['page-roles-id__abilities']">
      <div
        v-for="group in abilitiesGroups"
        :key="group.name"
        :class="$style['page-roles-id__abilities__group']"
      >
        <div
          :class="$style['page-roles-id__abilities__group__head']"
          @click="() => switchGroup(group.name)"
        >
          <div :class="$style['page-roles-id__abilities__group__head__start']">
            <div :class="$style['page-roles-id__abilities__group__head__start__button']">
              <UiIcon
                v-if="group.subGroups.length"
                :rotate="opened_groups.has(group.name) ? 90 : 270"
                name="chevron-left-rounded"
                rotate-transition
              />
            </div>

            <UiText variant="lead" font-weight="500">
              {{ group.text }}
            </UiText>
          </div>

          <div>
            <div :class="$style['page-roles-id__abilities-buttons']">
              <UiButton
                v-for="ability in group.abilities"
                :key="ability.name"
                :variant="ability.active ? 'default' : 'outlined'"
                :disabled="loading"
                size="large-compact"
                @click.stop="() => switchAbility(ability.key)"
              >
                <UiIcon :name="ability.icon" color="color-inherit" size="1em" />
              </UiButton>
            </div>
          </div>
        </div>

        <div
          v-if="group.subGroups.length"
          :class="{
            [$style['page-roles-id__abilities__group__subgroups']]: true,
            [$style['page-roles-id__abilities__group__subgroups--active']]: opened_groups.has(
              group.name,
            ),
          }"
        >
          <div :class="$style['page-roles-id__abilities__group__subgroups__inner']">
            <div
              v-for="subgroup in group.subGroups"
              :key="subgroup.name"
              :class="$style['page-roles-id__abilities__group__subgroups__subgroup']"
            >
              <UiText>
                {{ subgroup.text }}
              </UiText>

              <div :class="$style['page-roles-id__abilities-buttons']">
                <UiButton
                  v-for="ability in subgroup.abilities"
                  :key="ability.name"
                  :variant="ability.active ? 'default' : 'outlined'"
                  :disabled="loading"
                  size="large-compact"
                  @click.stop="() => switchAbility(ability.key)"
                >
                  <UiIcon :name="ability.icon" color="color-inherit" size="1em" />
                </UiButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.page-roles-id {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__abilities {
    &__group {
      $group-class: &;

      &:not(:last-of-type) {
        border-block-end: 1px solid $color-border;
      }

      &__head {
        padding-block: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;

        &__start {
          display: flex;
          gap: 0.5rem;

          &__button {
            min-width: 2rem;
          }
        }
      }

      &__subgroups {
        padding-inline-start: 3.5rem;
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows $duration-medium ease-in-out;

        &--active {
          grid-template-rows: 1fr;
        }

        &__inner {
          overflow: hidden;
        }

        &__subgroup {
          padding-block: 0.5rem;
          display: flex;
          justify-content: space-between;
          border-block-start: 1px solid $color-border;
        }
      }
    }
  }

  &__abilities-buttons {
    display: flex;
    gap: 0.25rem;
  }
}
</style>
