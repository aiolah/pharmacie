import defaultBoite from "@/assets/boite-default.png";

class Medicine
{
    id;
    photo = defaultBoite;
    denomination;
    formepharmaceutique;
    qte;

    constructor(medicine)
    {
        this.id = medicine.id;
        this.denomination = medicine.denomination;
        this.formepharmaceutique = medicine.formepharmaceutique;
        this.qte = medicine.qte;

        if(medicine.photo != null)
        {
            this.photo = `https://apipharmacie.pecatte.fr/images/${medicine.photo}`;
        }
    }

    get id()
    {
        return this.id;
    }

    get denomination()
    {
        return this.denomination;
    }

    get formepharmaceutique()
    {
        return this.formepharmaceutique;
    }

    get qte()
    {
        return this.qte;
    }

    get photo()
    {
        return this.photo;
    }

    addQte()
    {
        this.qte++;
    }

    reduceQte()
    {
        this.qte--;
    }
}

export default Medicine;