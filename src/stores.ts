import { Writable } from "svelte/store";
import sps from 'svelte-persistent-store';
const { writable } = sps.local;

export const players: Writable<[string, boolean, boolean][]> = writable("players", []);
export const visible: Writable<boolean> = writable("visible", true);

export function addCandidate(name: string, isMol: boolean) {
    players.update((a) => a.concat([[name, isMol]]));
}

export function remCandidate(name: string) {
    players.update((a) => a.filter((n) => n[0] != name));
}

export function setFinalCandidate(name: string) {
    players.update((a) => {
        for (let i = 0; i < a.length; i++) {
            a[i][2] = a[i][0] == name;
        }
        return a;
    });
}
