const addUserIndex = `
ALTER TABLE public.users
	ADD COLUMN full_text_weighted tsvector;
UPDATE public.users
SET full_text_weighted = setweight(to_tsvector(first_name), 'A') 
    ||  setweight(to_tsvector(last_name), 'B') 
    || 	setweight(to_tsvector(email), 'C');
CREATE INDEX full_text_weighted_index
	ON public.users
    USING GIN (full_text_weighted);
    
CREATE FUNCTION user_tsvector_trigger() RETURNS trigger AS $$
begin
    new.full_text_weighted :=     --'new' just means "new row"
    setweight(to_tsvector('english', coalesce(new.first_name, '')), 'A')
    || setweight(to_tsvector('english', coalesce(new.last_name, '')), 'B')
    || setweight(to_tsvector('english', coalesce(new.email, '')), 'C');
    return new;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
	ON public.users FOR EACH ROW EXECUTE PROCEDURE user_tsvector_trigger();
`

const removeUserIndex = `
DROP FUNCTION IF EXISTS user_tsvector_trigger();`

exports.up = async function(knex) {
    const hasTable = await knex.schema.hasTable("users")
    if (!hasTable) return

    return knex.schema.raw(addUserIndex)
}

exports.down = async function(knex) {
    await knex.schema.table("users", async tbl => {
        tbl.dropColumn("full_text_weighted")
        tbl.dropIndex("full_text_weighted", "full_text_weighted_index")
    })
    return knex.schema.raw(removeUserIndex)
}
