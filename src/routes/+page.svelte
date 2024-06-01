<script lang="ts">
    	import { db } from '$lib/middleware/firebase.client'
	import { collection, addDoc, Timestamp } from 'firebase/firestore'
    import { getDocs, orderBy, query } from 'firebase/firestore'
    let formSubmitted = false
    let name : string, username : string, uid : string;
    interface FormResponse {
        name: string,
        username: string,
        uid: string,
    }
    const handleSubmit = async () => {
		const formData = {
			name: name,
			username: username,
            uid: uid,
            createdAt: new Date()
		}
		const formRef = async (item : FormResponse) => {
			await addDoc(collection(db, 'wutheringWaves'), item)
		}
		formRef(formData)
		formSubmitted = true
	}


    let formResponses: FormResponse[] = []
	let filteredResponses = formResponses
	const colRef = collection(db, 'wutheringWaves')

	async function fetchResponses() {
		let fbFormResponses: FormResponse[] = []
		const q = query(colRef, orderBy('createdAt', 'asc'))
		const querySnapshot = await getDocs(q)
		querySnapshot.forEach((doc) => {
			let formResponse: FormResponse = { ...(doc.data() as FormResponse), id: doc.id}
			fbFormResponses = [formResponse, ...fbFormResponses]
		})
		formResponses = fbFormResponses
		filteredResponses = formResponses
        console.log(filteredResponses)
	}
	fetchResponses()
	const allResponses = () => {
		return filteredResponses = formResponses
	}
</script>

<div class="flex justify-center p-3">
    <div class="container">

        <div class="table-container">
            <!-- Native Table Element -->
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>UID</th>
                    </tr>
                    {#each filteredResponses as response}
                    <tr>
                        <td>{response.name}</td>
                        <td>{response.username}</td>
                        <td>{response.uid}</td>
                    </tr>
                    {/each}
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    </div>

    <form>
        <div>Name</div>
        <input type="text" class="text-black" bind:value={name}>
        <div>Username</div>
        <input type="text" class="text-black" bind:value={username}>
        <div>UID</div>
        <input type="text" class="text-black" bind:value={uid}>
    </form>
    <div class="container">
        <button on:click={handleSubmit}>submit</button>
    </div>